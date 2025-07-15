"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Invalid book ID'
            });
        }
        else if (book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available',
                error: 'Insufficient stock'
            });
        }
        else {
            book.copies -= quantity;
            book.available = book.copies > 0;
            yield book.save();
            const borrow = yield borrow_model_1.Borrow.create({ book: book._id, quantity, dueDate });
            res.status(201).json({
                success: true,
                message: 'Book borrowed successfully',
                data: borrow
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Borrow failed',
            error
        });
    }
}));
exports.borrowRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.Borrow.aggregate([
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
}));
