package com.example.demo.security;

import static com.example.demo.security.SecurityConstants.HEADER_STRING;
import static com.example.demo.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.domain.User;
import com.example.demo.services.CustomUserDetailsService;





public class JwtAuthenticationFilter extends OncePerRequestFilter{

	@Autowired
	JWTTokenProvider jWTTokenProvider;
	@Autowired
	CustomUserDetailsService customUserDetailsService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			String jwt = getJWTFromRequest(request);
			
			if(StringUtils.hasText(jwt)&&jWTTokenProvider.validateToken(jwt)) {
				Long userId = jWTTokenProvider.getUserIdFromToken(jwt);
				User userDetails = customUserDetailsService.loadUserById(userId);
				
				UsernamePasswordAuthenticationToken authentication = 
						new UsernamePasswordAuthenticationToken(userDetails,null,Collections.emptyList());
			
			    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			    SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("Could not set user authentication in security context");
		}
		filterChain.doFilter(request, response);
	}
	
	private String getJWTFromRequest(HttpServletRequest request) {
		
		String bearerTokenString = request.getHeader(HEADER_STRING);
		
		if(StringUtils.hasText(bearerTokenString)&&bearerTokenString.startsWith(TOKEN_PREFIX)) {
			return bearerTokenString.substring(7, bearerTokenString.length());
		}
		
		return null;
	}

	
}
