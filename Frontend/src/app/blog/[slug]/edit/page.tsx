"use client";

import EditStorys from "@/components/story/edit-story-form";

import { useParams } from "next/navigation";

export default function EditStory() {
  const params = useParams();
  const slug = params.slug as string;

  return <EditStorys slug={slug} />;
}
