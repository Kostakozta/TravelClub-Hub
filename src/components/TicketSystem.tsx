import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface Ticket {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface TicketSystemProps {
  ticket?: Ticket;
  onReply?: (message: string) => void;
  onStatusChange?: (status: Ticket["status"]) => void;
}

const statusColors = {
  open: "bg-blue-500",
  "in-progress": "bg-yellow-500",
  resolved: "bg-green-500",
  closed: "bg-gray-500",
};

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const defaultTicket: Ticket = {
  id: "T-1234",
  subject: "Quote Request for Luxury Beach Resort",
  status: "open",
  priority: "medium",
  createdAt: new Date(),
  updatedAt: new Date(),
  messages: [
    {
      id: "1",
      content:
        "I'd like to request a quote for the Luxury Beach Resort for next month.",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: "2",
      content:
        "I'll help you with that quote right away. Could you please confirm your preferred dates?",
      sender: "agent",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ],
};

const TicketSystem = ({
  ticket = defaultTicket,
  onReply,
  onStatusChange,
}: TicketSystemProps) => {
  const [newMessage, setNewMessage] = React.useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onReply?.(newMessage);
      setNewMessage("");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{ticket.subject}</h2>
            <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={priorityColors[ticket.priority]}>
              {ticket.priority.charAt(0).toUpperCase() +
                ticket.priority.slice(1)}{" "}
              Priority
            </Badge>
            <Badge className={statusColors[ticket.status]}>
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {ticket.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 space-y-4">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onStatusChange?.("resolved")}
            >
              Mark as Resolved
            </Button>
            <Button onClick={handleSendMessage}>Send Message</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketSystem;
