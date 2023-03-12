package com.jm.backend.config;

import com.jm.backend.encoder.ShaPasswordEncoder;
import com.jm.backend.filter.CustomCsrfFilter;
import com.jm.backend.filter.JwtRequestFilter;
import com.jm.backend.service.AuthService;
import com.jm.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final boolean securityDebug = false;
    private final AuthService authService;
    private final UserService userService;
    private final ShaPasswordEncoder passwordEncoder;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtRequestFilter jwtRequestFilter;
    private static final String[] CSRF_IGNORE = {"/api/v1/auth/authenticate","/api/v1/auth/register","/error",};


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf() // csrf config starts here
                .ignoringRequestMatchers(CSRF_IGNORE) // URI where CSRF check will not be applied
                .csrfTokenRepository(csrfTokenRepository()) // defines a repository where tokens are stored
                .and()
                .addFilterAfter(new CustomCsrfFilter(), CsrfFilter.class)
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/auth/authenticate","/api/v1/auth/register","/error",  "/css/**", "/js/**", "/img/**", "/lib/**", "/favicon.ico").permitAll()
                .and()
                .authorizeHttpRequests()
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @SneakyThrows
    @Bean
    public AuthenticationManager authManager(HttpSecurity http) {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userService)
                .passwordEncoder(passwordEncoder)
                .and()
                .authenticationProvider(authService)
                .build();
    }

    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName(CustomCsrfFilter.CSRF_COOKIE_NAME);
        return repository;
    }
}
