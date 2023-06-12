package com.discovermotrails.securitybackend.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class NoteFormDTO {
    @NotNull
    @NotBlank
    public long uid;

    @NotNull
    @NotBlank
    public int tid;

    @NotNull
    @NotBlank
    public String message;

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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
