package com.example.library;

import com.example.library.util.*;
import com.example.library.model.*;
import com.example.library.repository.*;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
class LibraryApplicationTests {

    @Autowired private BookRepository bookRepository;
    @Autowired private AuthorRepository authorRepository;
    @Autowired private PublisherRepository publisherRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private MemberRepository memberRepository;
    @Autowired private CartRepository cartRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private BookCopyRepository bookCopyRepository;
    @Autowired private OrderRepository orderRepository;
    @Autowired private OrderItemRepository orderItemRepository;

    @BeforeEach
    @Transactional
    void setup() {
        Publisher publisher = createSamplePublisher();
        Category category = createSampleCategory();

        Author author1 = createSampleAuthor("John Doe");
        Author author2 = createSampleAuthor("Jane Smith");

        Book book1 = createSampleBook("book1", publisher, category, author1);
        Book book2 = createSampleBook("book2", publisher, category, author2);
        Book book3 = createSampleBook("book3", publisher, category, author1);
        Book book4 = createSampleBook("book4", publisher, category, author2);

        BookCopy bookCopy1 = createSampleBookCopy(book1);
        BookCopy bookCopy2 = createSampleBookCopy(book2);

        Member member = createSampleMember();
        Cart cart = createSampleCart(member);

        createSampleCartItem(cart, bookCopy1);
        createSampleCartItem(cart, bookCopy2);

        Order order = createSampleOrder(member);
        createSampleOrderItem(order, bookCopy1);
        createSampleOrderItem(order, bookCopy2);
    }

    @Test
    void contextLoads() {
    }


    private Publisher createSamplePublisher() {
        return publisherRepository.save(Publisher.builder()
                .publisherName("Sample Publisher")
                .build());
    }

    private Category createSampleCategory() {
        return categoryRepository.save(Category.builder()
                .categoryName("Science Fiction")
                .build());
    }

    private Author createSampleAuthor(String name) {
        return authorRepository.save(Author.builder()
                .authorName(name)
                .build());
    }

    private Book createSampleBook(String title, Publisher publisher, Category category, Author author) {
        return bookRepository.save(Book.builder()
                .title(title)
                .publicationYear(2021)
                .pages(350)
                .pathToCover("/covers/" + title.replaceAll(" ", "_") + ".jpg")
                .publisher(publisher)
                .category(category)
                .author(author)
                .build());
    }

    private BookCopy createSampleBookCopy(Book book) {
        return bookCopyRepository.save(BookCopy.builder()
                .book(book)
                .build());
    }

    private Member createSampleMember() {
        return memberRepository.save(Member.builder()
                .firstName("Alice")
                .lastName("Smith")
                .email("alice@example.com")
                .password("password")
                .isAdmin(false)
                .build());
    }

    private Cart createSampleCart(Member member) {
        return cartRepository.save(Cart.builder()
                .member(member)
                .createdAt(LocalDateTime.now())
                .build());
    }

    private void createSampleCartItem(Cart cart, BookCopy bookCopy) {
        cartItemRepository.save(CartItem.builder()
                .cart(cart)
                .bookCopy(bookCopy)
                .build());
    }

    private Order createSampleOrder(Member member) {
        return orderRepository.save(Order.builder()
                .member(member)
                .status(OrderStatus.PENDING)
                .rentedAt(LocalDateTime.now())
                .build());
    }

    private void createSampleOrderItem(Order order, BookCopy bookCopy) {
        orderItemRepository.save(OrderItem.builder()
                .order(order)
                .bookCopy(bookCopy)
                .build());
    }
}
