import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  confirmTextButton: string;
  colorConfirmButton: "danger" | "success" | "warning" | "info" | "primary";
}

export const Alert = ({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
  confirmTextButton,
  colorConfirmButton,
}: AlertProps) => {
  const colors = {
    danger: "bg-red-500 hover:bg-red-600",
    success: "bg-green-500 hover:bg-green-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
    info: "bg-blue-500 hover:bg-blue-600",
    primary: "bg-blue-500 hover:bg-blue-600",
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between">
          <AlertDialogCancel className="cursor-pointer" onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={`cursor-pointer ${colors[colorConfirmButton]} text-white`}
            onClick={onConfirm}
          >
            {confirmTextButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
