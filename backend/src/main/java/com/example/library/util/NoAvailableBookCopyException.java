package com.example.library.util;

public class NoAvailableBookCopyException extends RuntimeException {
  public NoAvailableBookCopyException(Long bookId) {
    super("No available book copy found for book ID: " + bookId);
  }
}

