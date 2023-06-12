package com.discovermotrails.securitybackend.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BookmarkFormDTO {
    @NotNull
    @NotBlank
    public long uid;

    @NotNull
    @NotBlank
    public int tid;

    public long getUid() {
        return uid;
    }

    public void setUid(long uid) {
        this.uid = uid;
    }

    public int getTid() {
        return tid;
    }

    public void setTid(int tid) {
        this.tid = tid;
    }
}
