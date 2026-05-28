import React from "react";

type NoteCardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function NoteCard({
  children,
  title,
  className = "" // for CSS styling
}: NoteCardProps) {
  return (
    <div className={`note-card ${className}`}>
      {title && <div className="note-card__title">{title}</div>}
      <div className="note-card__body">{children}</div>
    </div>
  );
}