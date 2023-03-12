package com.jm.backend.controller;

import com.jm.backend.dto.UserDto;
import com.jm.backend.model.User;
import com.jm.backend.request.JwtRequest;
import com.jm.backend.response.JwtResponse;
import com.jm.backend.service.AuthService;
import com.jm.backend.service.UserService;
import com.jm.backend.util.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthService authService;


    @PostMapping(value = "/authenticate")
    public JwtResponse createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)  {
        try {
            authService.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getLogin(), authenticationRequest.getPassword()));
            final User userDetails = userService.loadUserByUsername(authenticationRequest.getLogin());
            final String token = jwtTokenUtil.generateToken(userDetails);
            return new JwtResponse(token);
        }catch (BadCredentialsException exc) {
            //TODO move to advice
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found", exc);
        }
    }
    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody UserDto user) {
        try {
            userService.registerUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            //TODO move to advice
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login in use", e);
        }
    }
    @PostMapping(value = "/user")
    public ResponseEntity<?> checkLoginStatus(Principal user) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
