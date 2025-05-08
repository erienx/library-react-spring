package com.example.library.service;

import com.example.library.model.BookCopy;
import com.example.library.model.Cart;
import com.example.library.model.CartItem;
import com.example.library.repository.BookCopyRepository;
import com.example.library.repository.CartItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemService {
    @Autowired
    private CartService cartService;
    @Autowired
    private BookCopyService bookCopyService;
    @Autowired
    private CartItemRepository cartItemRepository;

    @Transactional
    public CartItem addCartItem(Long memberId, Long bookId){
        Cart cart = cartService.getOrCreateUserCart(memberId);
        BookCopy bookCopy = bookCopyService.getBookCopy(bookId);
        CartItem cartItem =  CartItem.builder()
                .cart(cart)
                .bookCopy(bookCopy)
                .build();
        return cartItemRepository.save(cartItem);
    }

    @Transactional
    public void removeCartItem(Long memberId, Long bookId) {
        Cart cart = cartService.getOrCreateUserCart(memberId);
        Optional<CartItem> cartItem = cartItemRepository.findByCartAndBookCopy_Book_BookID(cart, bookId);
        cartItem.ifPresent(cartItemRepository::delete);
    }

}
