package com.jm.backend.service;

import com.jm.backend.dto.UserDto;
import com.jm.backend.encoder.ShaPasswordEncoder;
import com.jm.backend.exception.AuthException;
import com.jm.backend.model.User;
import com.jm.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final ShaPasswordEncoder passwordEncoder;

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not database"));
    }

    public User registerUser(UserDto userDto) throws AuthException {
        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new AuthException("Username in use");
        }
        return save(userDto);
    }

    public User save(UserDto userDto) {
        User user = createUser(userDto);
        return userRepository.save(user);
    }

    private User createUser(UserDto userDto) {
        String salt = passwordEncoder.generateSalt();
        String hashedPassword = passwordEncoder.encodeWithSHA512(userDto.getPassword(), salt);
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setSalt(salt);
        user.setHashPassword(hashedPassword);
        return user;
    }
}
