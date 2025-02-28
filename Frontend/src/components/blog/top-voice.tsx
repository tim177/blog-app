import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const topUsers = [
  {
    name: "Cheenta Admin",
    role: "admin",
    avatar: "/placeholder.svg",
  },
  {
    name: "Raghav Mukhija",
    role: "student",
    avatar: "/placeholder.svg",
  },
  {
    name: "Gayathiri V",
    role: "student",
    avatar: "/placeholder.svg",
  },
];

export function TopVoices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-block h-5 w-5 text-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 15 2 2 4-4" />
              <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8z" />
              <path d="M2 13c0 1.1.9 2 2 2h4" />
              <path d="M2 19c0 1.1.9 2 2 2h4" />
              <path d="M2 7c0 1.1.9 2 2 2h4" />
            </svg>
          </span>
          Top Voices
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {topUsers.map((user) => (
          <div key={user.name} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <Badge variant="secondary" className="mt-1">
                {user.role}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
