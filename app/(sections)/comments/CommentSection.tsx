"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { HiUser, HiPhotograph, HiX } from "react-icons/hi";
import SectionTitle from "@/app/components/ui/SectionTitle";
import Button from "@/app/components/ui/Button";
import { useLanguage } from "@/app/context/LanguageContext";

interface Comment {
  id: number;
  name: string;
  message: string;
  photo?: string;
  createdAt: string;
}

// Dummy comments data
const DUMMY_COMMENTS: Comment[] = [
  {
    id: 1,
    name: "John Doe",
    message: "Great portfolio! Love the clean design and the projects you've worked on. Keep up the amazing work!",
    createdAt: "2 days ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    message: "Impressive skillset! The Outbound Management System project looks really interesting.",
    createdAt: "1 week ago",
  },
  {
    id: 3,
    name: "Alex Johnson",
    message: "Very professional website. I'd love to collaborate on a project sometime!",
    createdAt: "2 weeks ago",
  },
  {
    id: 4,
    name: "Sarah Williams",
    message: "The timeline resume section is beautifully designed. Great attention to detail!",
    createdAt: "3 weeks ago",
  },
];

export default function CommentSection() {
  const { t } = useLanguage();
  const [commentData, setCommentData] = useState({ name: "", message: "" });
  const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: Comment = {
      id: comments.length + 1,
      name: commentData.name,
      message: commentData.message,
      photo: photoPreview || undefined,
      createdAt: "Just now",
    };
    setComments([newComment, ...comments]);
    setCommentData({ name: "", message: "" });
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleFileSelect = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 2MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section id="comments" className="min-h-screen py-20">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t("contact.comments.title")} />

        <div className="max-w-4xl mx-auto">
          {/* Comment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 md:p-8 mb-12"
          >
            <form onSubmit={handleCommentSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    {t("contact.comments.name")}
                  </label>
                  <input
                    type="text"
                    value={commentData.name}
                    onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-gray-500 transition-colors"
                    required
                  />
                </div>

                {/* Profile Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    {t("contact.comments.photo")}
                    <span className="text-[var(--foreground-secondary)] font-normal ml-2">
                      (Max 2MB)
                    </span>
                  </label>
                  
                  {!photoPreview ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative flex items-center justify-center gap-3 px-4 py-3 bg-[var(--surface)] border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
                        isDragging
                          ? "border-gray-500 bg-gray-500/10"
                          : "border-[var(--border)] hover:border-gray-500"
                      }`}
                    >
                      <HiPhotograph className="w-6 h-6 text-[var(--foreground-secondary)]" />
                      <div className="text-sm">
                        <span className="text-[var(--foreground)]">Drop image here</span>
                        <span className="text-[var(--foreground-secondary)]"> or click to browse</span>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(file);
                        }}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-500">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm text-[var(--foreground)] truncate">
                          {photoFile?.name}
                        </p>
                        <p className="text-xs text-[var(--foreground-secondary)]">
                          {photoFile && (photoFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="p-2 rounded-lg text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                      >
                        <HiX className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  {t("contact.comments.message")}
                </label>
                <textarea
                  value={commentData.message}
                  onChange={(e) => setCommentData({ ...commentData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-gray-500 transition-colors resize-none"
                  required
                />
              </div>

              <Button type="submit">
                {t("contact.comments.submit")}
              </Button>
            </form>
          </motion.div>

          {/* Comments List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[var(--foreground)] font-[family-name:var(--font-sora)]">
              Comments ({comments.length})
            </h3>
            
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  {comment.photo ? (
                    <img src={comment.photo} alt={comment.name} className="w-full h-full object-cover" />
                  ) : (
                    <HiUser className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-[var(--foreground)]">{comment.name}</span>
                    <span className="text-xs text-[var(--foreground-secondary)]">• {comment.createdAt}</span>
                  </div>
                  <p className="text-[var(--foreground-secondary)]">{comment.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
