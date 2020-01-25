package com.example.demo.security;

import static com.example.demo.security.SecurityConstants.EXPIRATION_TIME;
import static com.example.demo.security.SecurityConstants.SECRET;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.example.demo.domain.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JWTTokenProvider {

//generate the token
 public String generateToken(Authentication authentication) {
	 User user = (User)authentication.getPrincipal();
	 Date now = new Date(System.currentTimeMillis());
	 Date expiryDate =new Date(now.getTime()+EXPIRATION_TIME);
	 
	 String userId = Long.toString(user.getId());
	 
	 Map<String, Object> claims = new HashMap<>();
	 claims.put("id", (Long.toString(user.getId())));
	 claims.put("username", user.getUsername());
	 claims.put("fullname", user.getFullname());
	 
	 return Jwts.builder()
			 .setSubject(userId)
			 .setClaims(claims)
			 .setIssuedAt(now)
			 .setExpiration(expiryDate)
			 .signWith(SignatureAlgorithm.HS512, SECRET)
			 .compact();
 }
	
	
	
//validate the token
   
 public boolean validateToken(String token) {
	 try {
		Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
		return true;
	} catch (SignatureException e) {
		System.out.println("Invalid JWT Signature key");
	}catch (MalformedJwtException e) {
		// TODO: handle exception
		System.out.println("Invalit JWT Token");
	}catch (ExpiredJwtException e) {
		// TODO: handle exception
		System.out.println("Expired JWT Token");
	}catch (UnsupportedJwtException e) {
		// TODO: handle exception
		System.out.println("Unsupported JWT Token");
	}catch (IllegalArgumentException e) {
		// TODO: handle exception
		System.out.println("JWT claims string is empty");
	}
	 
	 return false;
 }
 
//Get user id from token	
	public Long getUserIdFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
		String id = (String)claims.get("id");
		return Long.parseLong(id);
	}
}
