// chat.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatControllerService } from '../../services/services/chat-controller.service';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  userMessage: string = '';
  chatHistory: { user: string, bot: string }[] = [];

  constructor(
    private chatService: ChatControllerService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  sendMessage() {
    if (this.userMessage.trim()) {
      const userMessage = this.userMessage.trim();
      this.chatHistory.push({ user: userMessage, bot: '' });
      this.userMessage = '';

      this.chatService.getChatResponse({ message: userMessage }).subscribe(
        response => {
          const botResponse = response?.response; // Adjust based on service response structure
          this.chatHistory[this.chatHistory.length - 1].bot = botResponse || 'Sorry, something went wrong.';
        },
        error => {
          console.error('Error:', error);
          this.chatHistory[this.chatHistory.length - 1].bot = 'Sorry, something went wrong. Please try again.';
        }
      );
    }
  }

  signOut() {
    this.tokenService.clearToken(); // Clear the token
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
