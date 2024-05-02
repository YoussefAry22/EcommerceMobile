package com.twd.SpringSecurityJWT.service;


import com.twd.SpringSecurityJWT.dto.ReqRes;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.repository.OurUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class OurUsersService {

    @Autowired
    private OurUserRepo ourUserRepo ;

    public ReqRes getAdminProfile(UserDetails userDetails) {
        ReqRes response = new ReqRes();
        try {
            // Get user email from UserDetails
            String userEmail = userDetails.getUsername();

            // Retrieve user details by email
            OurUsers user = ourUserRepo.findByEmail(userEmail).orElse(null);

            // Check if user exists and has role ADMIN
//            if (user != null && user.getRole().equals("ADMIN")) {
                response.setStatusCode(200);
                response.setOurUsers(user);
                response.setMessage("User profile retrieved successfully");
//            } else {
//                response.setStatusCode(403); // Forbidden
//                response.setMessage("You are not authorized to access this resource");
//            }
        } catch (Exception e) {
            response.setStatusCode(500); // Internal Server Error
            response.setError(e.getMessage());
        }
        return response;
    }
}
