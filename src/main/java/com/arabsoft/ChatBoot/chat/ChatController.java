package com.arabsoft.ChatBoot.chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/message")
    public ResponseEntity<Map<String, String>> getChatResponse(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        String botResponse = chatService.getBotResponse(userMessage);

        Map<String, String> response = new HashMap<>();
        response.put("response", botResponse);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
