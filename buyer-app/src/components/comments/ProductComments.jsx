import React from "react";
import { MessageSquare, User, Calendar } from "lucide-react";

const ProductComments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="p-6 bg-gray-100 rounded text-center">
        <MessageSquare className="mx-auto text-gray-400 mb-2" />
        <p>No comments yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <div
          key={index}
          className="bg-white border rounded p-4 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <User className="text-gray-500" />
            <span className="font-medium">
              {comment.b_id?.username ||
                comment.b_id?._id?.slice(-6) ||
                "Anonymous"}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar size={14} />
              {new Date(comment.date).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductComments;
