package com.example.library.repository;
import com.example.library.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    Optional<Member> getMemberByEmail(String email);
    Optional<Member> getMemberByMemberID(Long id);

    @Query("""
    SELECT m FROM Member m 
    WHERE (:email IS NULL OR :email = '' OR LOWER(m.email) LIKE LOWER(CONCAT('%', :email, '%')))
    AND (:firstName IS NULL OR :firstName = '' OR LOWER(m.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')))
    AND (:lastName IS NULL OR :lastName = '' OR LOWER(m.lastName) LIKE LOWER(CONCAT('%', :lastName, '%')))
    """)
    List<Member> searchMembersByFields(
            @Param("email") String email,
            @Param("firstName") String firstName,
            @Param("lastName") String lastName
    );
}