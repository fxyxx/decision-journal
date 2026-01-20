import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface FormFieldProps {
	id: string;
	label: string;
	icon: ReactNode;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	hint?: string;
	error?: string;
	disabled?: boolean;
	minHeight?: string;
	maxHeight?: string;
}

export function FormField({
	id,
	label,
	icon,
	value,
	onChange,
	placeholder,
	hint,
	error,
	disabled,
	minHeight = "80px",
	maxHeight,
}: FormFieldProps) {
	return (
		<div>
			<Label htmlFor={id} className="text-base font-semibold flex items-center gap-2 mb-2">
				{icon}
				{label}
			</Label>
			<Textarea
				id={id}
				name={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				className={cn("resize-y text-base", error && "border-red-500 focus-visible:ring-red-500")}
				style={{
					minHeight,
					maxHeight,
				}}
			/>
			{error && <p className="text-sm text-red-600 font-medium mt-1">{error}</p>}
			{hint && <p className="text-[0.8rem] text-muted-foreground mt-1.5">{hint}</p>}
		</div>
	);
}
