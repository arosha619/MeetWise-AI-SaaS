interface Props {
    children: React.ReactNode;
}

export default function CallLayout({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    )
}