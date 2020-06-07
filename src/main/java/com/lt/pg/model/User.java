package com.lt.pg.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    @JsonDeserialize(using = PasswordEncodedDeserializer.class)
    private String password;

    @Column(nullable = false)
    private Boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER)
    @Builder.Default
    private List<Authority> authorities = new ArrayList<Authority>();
}
