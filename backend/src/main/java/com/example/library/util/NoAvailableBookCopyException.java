package com.example.library.util;

public class NoAvailableBookCopyException extends RuntimeException {
  public NoAvailableBookCopyException(String message) {
    super(message);
  }
}
