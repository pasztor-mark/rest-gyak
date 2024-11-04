import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

let books = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    publishYear: 1949,
    reserved: false
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0061120084",
    publishYear: 1960,
    reserved: true
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    publishYear: 1925,
    reserved: false
  },
  {
    id: 4,
    title: "Brave New World",
    author: "Aldous Huxley",
    isbn: "978-0060850524",
    publishYear: 1932,
    reserved: true
  },
  {
    id: 5,
    title: "Moby Dick",
    author: "Herman Melville",
    isbn: "978-1503280786",
    publishYear: 1851,
    reserved: false
  }
];
@Controller('books')

export class BooksController {
  
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createBookDto: CreateBookDto) {
    books = [
      ...books,
      createBookDto
    ]
    return this.booksService.create(createBookDto);
  }

  @Get()
  
  findAll() {
    return books
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return books.filter(book => (book.id.toString() == id))
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    let bookId = undefined
    for (let i = 0; i < books.length; i++) {
      if (id == books[i].id.toString()) {
        bookId = i.toString()
      }
      
    }
    if (bookId) {

      books[bookId] = updateBookDto
    }
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    books = books.filter(book => (book.id.toString() != id))
    return this.booksService.remove(+id);
  }
}
