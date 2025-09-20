"use client";

import { useState } from "react";
import { useContent } from "../hooks/useContent";

export default function ContentManager() {
  const { content, updateContent, loading } = useContent();
  const [activeSection, setActiveSection] = useState("event");
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const sections = [
    { id: "event", name: "Event Info", icon: "📅" },
    { id: "hero", name: "Hero Section", icon: "🏠" },
    { id: "about", name: "About Section", icon: "📖" },
    { id: "speakers", name: "Speakers", icon: "🎤" },
    { id: "schedule", name: "Schedule", icon: "⏰" },
    { id: "sponsors", name: "Sponsors", icon: "🤝" },
    { id: "venue", name: "Venue", icon: "📍" },
    { id: "registration", name: "Registration", icon: "🎫" },
  ];

  const handleSave = () => {
    updateContent(editedContent);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setEditMode(false);
  };

  const updateNestedContent = (
    path: string[],
    value: string | string[] | { text: string }[]
  ) => {
    const newContent = { ...editedContent };
    let current: Record<string, any> = newContent;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    setEditedContent(newContent);
  };

  const renderContentEditor = () => {
    const section = sections.find((s) => s.id === activeSection);
    if (!section) return null;

    const sectionData =
      editedContent[activeSection as keyof typeof editedContent];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">{section.name} Content</h3>

        {activeSection === "event" && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Event Name
              </label>
              <input
                type="text"
                value={editedContent.event.name}
                onChange={(e) =>
                  updateNestedContent(["event", "name"], e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hashtag</label>
              <input
                type="text"
                value={editedContent.event.hashtag}
                onChange={(e) =>
                  updateNestedContent(["event", "hashtag"], e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Date Display
              </label>
              <input
                type="text"
                value={editedContent.event.dates.display}
                onChange={(e) =>
                  updateNestedContent(
                    ["event", "dates", "display"],
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Location Display
              </label>
              <input
                type="text"
                value={editedContent.event.location.display}
                onChange={(e) =>
                  updateNestedContent(
                    ["event", "location", "display"],
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
          </div>
        )}

        {activeSection === "hero" && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={editedContent.hero.headline.main}
                onChange={(e) =>
                  updateNestedContent(
                    ["hero", "headline", "main"],
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <textarea
                value={editedContent.hero.headline.subtitle}
                onChange={(e) =>
                  updateNestedContent(
                    ["hero", "headline", "subtitle"],
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded-md h-20"
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                CTA Button 1 Text
              </label>
              <input
                type="text"
                value={editedContent.hero.cta.buttons[0]?.text || ""}
                onChange={(e) => {
                  const newButtons = [...editedContent.hero.cta.buttons];
                  newButtons[0] = { ...newButtons[0], text: e.target.value };
                  updateNestedContent(["hero", "cta", "buttons"], newButtons);
                }}
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                CTA Button 2 Text
              </label>
              <input
                type="text"
                value={editedContent.hero.cta.buttons[1]?.text || ""}
                onChange={(e) => {
                  const newButtons = [...editedContent.hero.cta.buttons];
                  newButtons[1] = { ...newButtons[1], text: e.target.value };
                  updateNestedContent(["hero", "cta", "buttons"], newButtons);
                }}
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
          </div>
        )}

        {activeSection === "about" && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Eyebrow Text
              </label>
              <input
                type="text"
                value={editedContent.about.eyebrow}
                onChange={(e) =>
                  updateNestedContent(["about", "eyebrow"], e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={editedContent.about.title}
                onChange={(e) =>
                  updateNestedContent(["about", "title"], e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Content Paragraphs
              </label>
              <textarea
                value={editedContent.about.content.join("\n\n")}
                onChange={(e) =>
                  updateNestedContent(
                    ["about", "content"],
                    e.target.value.split("\n\n")
                  )
                }
                className="w-full px-3 py-2 border rounded-md h-32"
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Text</label>
              <input
                type="text"
                value={editedContent.about.cta.text}
                onChange={(e) =>
                  updateNestedContent(["about", "cta", "text"], e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={!editMode}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed top-4 right-4 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Content Manager
          </h2>
          <div className="flex gap-2">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-32 border-r border-gray-200">
          <div className="p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm mb-1 ${
                  activeSection === section.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 max-h-96 overflow-y-auto">
          {renderContentEditor()}
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <div className="text-white">Saving...</div>
        </div>
      )}
    </div>
  );
}
