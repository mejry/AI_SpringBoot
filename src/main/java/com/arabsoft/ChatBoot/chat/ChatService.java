package com.arabsoft.ChatBoot.chat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
@Service
public class ChatService {

    @Value("${flask.server.url}")
    private String flaskServerUrl;

    private final RestTemplate restTemplate;

    public ChatService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getBotResponse(String userMessage) {
        String url = flaskServerUrl + "/chat"; // Ensure this URL is correct
        Map<String, String> request = new HashMap<>();
        request.put("message", userMessage);

        Map response = restTemplate.postForObject(url, request, Map.class);

        return response != null ? (String) response.get("response") : "Error in response";
    }
}
