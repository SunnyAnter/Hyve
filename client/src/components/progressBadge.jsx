import { Badge } from "@ui";

function ProgressBadge({ progress }) {
  return (
    <>
      {
        (progress === 0) ?
          <Badge className="h-8 w-24 bg-cyan-500 hover:bg-cyan-600 flex justify-center text-cyan-50 cursor-default">Not Started</Badge>
          : progress === 1 ?
            <Badge className="h-8 w-24 bg-indigo-500 hover:bg-indigo-600 flex justify-center text-indigo-50 cursor-default">In Progress</Badge>
            : progress === 2 ?
              <Badge className="h-8 w-24 bg-rose-500 hover:bg-rose-600 flex justify-center text-rose-50 cursor-default">Overdue</Badge> :
              <Badge className="h-8 w-24 bg-teal-500 hover:bg-teal-600 flex justify-center text-teal-50 cursor-default">Completed</Badge>
      }
    </>
  )
}

export default ProgressBadge
