import express, { Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';

export const borrowRoutes = express.Router();

borrowRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
        error: 'Invalid book ID'
      });
    } else if (book.copies < quantity) {
      res.status(400).json({
        success: false,
        message: 'Not enough copies available',
        error: 'Insufficient stock'
      });
    } else {
      book.copies -= quantity;
      book.available = book.copies > 0;
      await book.save();

      const borrow = await Borrow.create({ book: book._id, quantity, dueDate });

      res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: borrow
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Borrow failed',
      error
    });
  }
});


borrowRoutes.get('/', async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' }
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookDetails'
      }
    },
    { $unwind: '$bookDetails' },
    {
      $project: {
        _id: 0,
        book: {
          title: '$bookDetails.title',
          isbn: '$bookDetails.isbn'
        },
        totalQuantity: 1
      }
    }
  ]);

  res.json({ success: true, message: 'Borrowed books summary retrieved successfully', data: summary });
});