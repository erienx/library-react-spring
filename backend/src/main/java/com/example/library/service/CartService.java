package com.example.library.service;

import com.example.library.model.Book;
import com.example.library.model.Cart;
import com.example.library.model.CartItem;
import com.example.library.model.Member;
import com.example.library.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private MemberService memberService;

    public Cart getOrCreateUserCart(Long memberId){
        Member member = memberService.getMemberById(memberId).orElseThrow(() -> new IllegalArgumentException("Member not found"));
        return cartRepository.findByMember(member).orElseGet(()-> createNewCartByMember(member));
    }
    public Cart createNewCartByMember(Member member){
        Cart cart = Cart.builder()
                .member(member)
                .build();
        return cartRepository.save(cart);
    }
    public Page<Cart> getAllCarts(Pageable pageable){
        return cartRepository.findAll(pageable);
    }
    public List<Book> getCartBooksByMemberId(Long memberId) {
        Cart cart = getOrCreateUserCart(memberId);
        return cart.getCartItems().stream().map(cartItem -> cartItem.getBookCopy().getBook()).distinct().toList();
    }
}
