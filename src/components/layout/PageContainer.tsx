import { ReactNode } from "react"

interface PageContainerProps {
    title: string
    description?: string | ReactNode
    action?: ReactNode
    children: ReactNode
}

export function PageContainer({ title, description, action, children }: PageContainerProps) {
    return (
        <div className="space-y-6">
            {/* HEADER SECTION */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-[#1F3D2B]">{title}</h1>
                    {description && (
                        <div className="text-sm text-muted-foreground">
                            {description}
                        </div>
                    )}
                </div>

                {/* ACTION BUTTONS (e.g. Add New) */}
                {action && (
                    <div className="flex items-center gap-2">
                        {action}
                    </div>
                )}
            </div>

            {/* MAIN CONTENT */}
            <div>
                {children}
            </div>
        </div>
    )
}
