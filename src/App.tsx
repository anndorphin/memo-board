import { useEffect, useState } from "react";
import AppButton from "./components/AppButton";
import NoteCard from "./components/NoteCard";
import "./styles.css";

type NoteColor = "yellow" | "green" | "pink" | "purple";

type Note = {
  id: string;
  text: string;
  createdAt: number;
  isDeleting?: boolean;
  color: NoteColor;
};

export default function App() {
  const [now, setNow] = useState<number>(Date.now());
  const [text, setText] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [pickingColorForId, setPickingColorForId] = useState<string | null>(
    null
  );

  function handleClear() {
    setText("");
  }

  function handlePin() {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newNote: Note = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: trimmed,
      createdAt: Date.now(),
      color: "yellow",
    };

    setNotes((prev) => [...prev, newNote]);
    setText("");
  }

  function openColorPicker(noteId: string) {
    setPickingColorForId(noteId);
  }

  function setNoteColor(noteId: string, color: NoteColor) {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, color } : n))
    );
    setPickingColorForId(null);
  }

  function handlePeelOff(noteId: string) {
    const ok = window.confirm("Peel off this memo?");
    if (!ok) return;

    // mark as deleting (adds CSS animation class)
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isDeleting: true } : n))
    );

    // remove after animation finishes
    window.setTimeout(() => {
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    }, 450);
  }

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  function getGreeting(date: Date) {
    const h = date.getHours(); // 0–23

    if (h >= 4 && h <= 11) return "Good Morning!";
    if (h >= 12 && h <= 17) return "Good Afternoon!";
    return "Good Evening!"; // 18:00–03:59
  }

  return (
    <div className="appShell">
      <h1>{getGreeting(new Date(now))}</h1>
      <h2>{new Date(now).toLocaleString()}</h2>
      <div className="notesGrid">
        {notes.map((note) => (
          <div key={note.id} className={note.isDeleting ? "falling" : ""}>
            <NoteCard>
              <div
                className={`noteBox note-${note.color}`}
                onClick={() => openColorPicker(note.id)}
              >
                <div className="noteMessage">{note.text}</div>

                <div className="noteFooter">
                  <div className="noteTime">
                    {new Date(note.createdAt).toLocaleString()}
                  </div>

                  <AppButton
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePeelOff(note.id);
                    }}
                    disabled={note.isDeleting}
                  >
                    Peel-off
                  </AppButton>
                </div>
                {pickingColorForId === note.id && (
                  <div
                    className="colorOverlay"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="colorSwatch swatch-yellow"
                      onClick={() => setNoteColor(note.id, "yellow")}
                      aria-label="Pale yellow"
                    />
                    <button
                      className="colorSwatch swatch-green"
                      onClick={() => setNoteColor(note.id, "green")}
                      aria-label="Neon green"
                    />
                    <button
                      className="colorSwatch swatch-pink"
                      onClick={() => setNoteColor(note.id, "pink")}
                      aria-label="Neon pink"
                    />
                    <button
                      className="colorSwatch swatch-purple"
                      onClick={() => setNoteColor(note.id, "purple")}
                      aria-label="Pale purple"
                    />
                  </div>
                )}
              </div>
            </NoteCard>
          </div>
        ))}
      </div>

      {/* This wrapper gets pushed to bottom */}
      <div className="composerDock">
        <div className="composer">
          <h3>New memo</h3>

          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your memo..."
          />

          <div>
            <AppButton variant="secondary" onClick={handleClear}>
              Clear
            </AppButton>

            <AppButton
              variant="primary"
              onClick={handlePin}
              disabled={text.trim().length === 0}
            >
              Pin
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
