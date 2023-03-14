package com.jm.backend.service;

import com.jm.backend.encoder.ShaPasswordEncoder;
import com.jm.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthenticationProvider {
    private final UserRepository userRepository;
    private final ShaPasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if(authentication.getName() == null || authentication.getCredentials() == null) throw new BadCredentialsException("User does not exist");
        var login = authentication.getName();
        var rawPassword = authentication.getCredentials().toString();

        //check if user with given login exists in DB
        if(!userRepository.existsByUsername(login)) throw new BadCredentialsException("User does not exist");
        //fetch user data
        var user = userRepository.findByUsername(login).get();
        //check if account is not locked
        if(!user.isAccountNonLocked()) throw new DisabledException("Account is locked! You have to wait 3 minutes");
        //if SHA512 then use SHA512 encoder
        if(!passwordEncoder.matchesWithSHA512(rawPassword, user.getSalt(), user.getPassword())) throw new BadCredentialsException("Wrong login or password");
        //if HMAC then use HMAC encoder

        //after all checks passed -> authenticate
        return new UsernamePasswordAuthenticationToken(login, rawPassword, Collections.emptyList());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
