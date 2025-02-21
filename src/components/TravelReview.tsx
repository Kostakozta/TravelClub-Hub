import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: Date;
}

interface TravelReviewProps {
  review?: {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    hotelName: string;
    location: string;
    rating: number;
    content: string;
    images?: string[];
    likes: number;
    comments: Comment[];
    timestamp: Date;
  };
  onLike?: (reviewId: string) => void;
  onComment?: (reviewId: string, comment: string) => void;
}

const defaultReview = {
  id: "1",
  authorId: "1",
  authorName: "Sarah Thompson",
  authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  hotelName: "Grand Resort & Spa",
  location: "Maldives",
  rating: 5,
  content:
    "An absolutely stunning experience with impeccable service. The overwater villa was a dream come true, and the staff went above and beyond to make our stay memorable.",
  images: [
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
  ],
  likes: 24,
  comments: [
    {
      id: "1",
      authorId: "2",
      authorName: "John Doe",
      content: "This looks amazing! Did you try their spa services?",
      timestamp: new Date(2024, 2, 1),
    },
  ],
  timestamp: new Date(2024, 1, 15),
};

const TravelReview = ({
  review = defaultReview,
  onLike,
  onComment,
}: TravelReviewProps) => {
  const [newComment, setNewComment] = React.useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onComment?.(review.id, newComment);
      setNewComment("");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <img
              src={review.authorAvatar}
              alt={review.authorName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{review.authorName}</h3>
              <p className="text-sm text-muted-foreground">
                {review.timestamp.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">{review.hotelName}</h4>
            <p className="text-sm text-muted-foreground">{review.location}</p>
          </div>
          <p>{review.content}</p>
          {review.images && review.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          <div className="flex items-center gap-4 pt-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => onLike?.(review.id)}
            >
              <ThumbsUp className="h-4 w-4" />
              {review.likes}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {review.comments.length}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <div className="w-full space-y-4">
          {review.comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.authorName}`}
                alt={comment.authorName}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-sm">{comment.authorName}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {comment.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSubmitComment}>Post</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TravelReview;
