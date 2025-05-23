package com.example.library.controller;

import com.example.library.dto.AddItemCartDto;
import com.example.library.model.Book;
import com.example.library.model.Cart;
import com.example.library.model.CartItem;
import com.example.library.model.Member;
import com.example.library.service.CartItemService;
import com.example.library.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private CartItemService cartItemService;

    @GetMapping
    public Page<Cart> getAllCarts(Pageable pageable){
        return cartService.getAllCarts(pageable);
    }

    @PostMapping("/items")
    public CartItem addItemToCart(@RequestBody AddItemCartDto addItemCartDto){
        return cartItemService.addCartItem(addItemCartDto.memberId(), addItemCartDto.bookId());
    }
    @DeleteMapping("/items")
    public ResponseEntity<?> removeItemFromCart(@RequestParam Long memberId, @RequestParam Long bookId) {
        cartItemService.removeCartItem(memberId, bookId);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/items/contains")
    public boolean isBookInCart(@RequestParam Long memberId, @RequestParam Long bookId) {
        Cart cart = cartService.getOrCreateUserCart(memberId);
        return cart.getCartItems().stream()
                .anyMatch(item -> item.getBookCopy().getBook().getBookID().equals(bookId));
    }
    @GetMapping("/items")
    public ResponseEntity<List<Book>> getCartItems(@RequestParam Long memberId) {
        List<Book> cartBooks = cartService.getCartBooksByMemberId(memberId);
        return ResponseEntity.ok(cartBooks);
    }
}
