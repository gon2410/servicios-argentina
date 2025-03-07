export type Message =
	| { success: string }
	| { error: string }
	| { message: string };

export function FormMessage({ message }: { message: Message }) {
	return (
		<div className="flex flex-col gap-2 w-full max-w-md text-sm">
			{"success" in message && (
				<div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
				{message.success}
				</div>
			)}
			{"error" in message && (
				<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
				{message.error}
				</div>
			)}
			{"message" in message && (
				<div className="text-foreground border-l-2 px-4">{message.message}</div>
			)}
		</div>
	);
}
