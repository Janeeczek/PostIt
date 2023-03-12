package com.jm.backend.encoder;

import lombok.SneakyThrows;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@Component
public class ShaPasswordEncoder implements PasswordEncoder {
    private final String PEPPER = "3@#5#3d%sa%f2";
    @Override
    public String encode(CharSequence rawPassword) {
        return BCrypt.hashpw(rawPassword.toString(),BCrypt.gensalt(8));
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return BCrypt.checkpw(rawPassword.toString(),encodedPassword);
    }

    public String encodeWithSHA512(CharSequence rawPassword, String salt){
        return calculateSHA512(PEPPER + rawPassword + salt);
    }
    public boolean matchesWithSHA512(String rawPassword, String salt, String encodedPassword){
        return calculateSHA512(PEPPER + rawPassword + salt).equals(encodedPassword);
    }
    public String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[10];
        random.nextBytes(salt);
        return Base64.encodeBase64String(salt);
    }
    @SneakyThrows
    public static String calculateSHA512(String text)
    {
        try {
            //get an instance of SHA-512
            MessageDigest md = MessageDigest.getInstance("SHA-512");

            //calculate message digest of the input string - returns byte array
            byte[] messageDigest = md.digest(text.getBytes());

            // Convert byte array into signum representation
            BigInteger no = new BigInteger(1, messageDigest);

            // Convert message digest into hex value
            String hashtext = no.toString(16);

            // Add preceding 0s to make it 32 bit
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }

            // return the HashText
            return hashtext;
        }

        // If wrong message digest algorithm was specified
        catch (NoSuchAlgorithmException | NumberFormatException e) {
            throw new RuntimeException(e);
        }
    }
}
