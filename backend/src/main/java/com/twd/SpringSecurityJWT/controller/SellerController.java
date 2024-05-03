package com.twd.SpringSecurityJWT.controller;


import com.twd.SpringSecurityJWT.dto.ReqRes;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class SellerController {

    @Autowired
    private SellerService sellerService;


    @PostMapping("/addSeller")
    @Secured("ADMIN")
    public ResponseEntity<ReqRes> addSeller(@RequestBody ReqRes addSellerRequest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        OurUsers user = SellerService.getUserByMail(username).orElse(null);

        if (user == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else if (!Objects.equals(user.getRole(), "ADMIN")) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(sellerService.createSeller(addSellerRequest));
    }

    @GetMapping("/sellers")
//  @Secured("ADMIN")
    public ResponseEntity<List<OurUsers>> getSellers() {
        List<OurUsers> sellers = sellerService.getAllSellers();
        return ResponseEntity.ok(sellers);
    }

    @GetMapping("/seller/{id}")
    @Secured("ADMIN")
    public ResponseEntity<OurUsers> getSellerById(@PathVariable Long id) {
        Optional<OurUsers> sellerOptional = sellerService.getSellerById(id);
        return sellerOptional
                .map(seller -> ResponseEntity.ok(seller))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/seller/{id}")
    @Secured("ADMIN")
    public ResponseEntity<Void> deleteSellerById(@PathVariable Long id) {
        boolean deleted = sellerService.deleteSellerById(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/seller/{id}")
    public ResponseEntity<ReqRes> updateSeller(@PathVariable Long id, @RequestBody ReqRes updateRequest) {
        ReqRes response = sellerService.updateSeller(id, updateRequest);
        return ResponseEntity.ok(response);
    }
}
