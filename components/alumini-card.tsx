export default function AlumniCard({ alumni }: { alumni: any }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <img
        src={alumni.avatarUrl || "/default-avatar.png"}
        alt="avatar"
        className="w-20 h-20 rounded-full mb-2"
      />
      <h3 className="font-semibold">{alumni.email}</h3>
      <p className="text-sm text-gray-600">
        {alumni.branch} • {alumni.graduationYear}
      </p>
      <p className="text-sm">{alumni.location}</p>
      <p className="text-sm italic">{alumni.bio}</p>
      {alumni.skills && (
        <div className="flex flex-wrap gap-1 mt-2">
          {alumni.skills.map((skill: string, idx: number) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-xs">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
