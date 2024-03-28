import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '~/components/ui/tooltip';

type Props = {
    children: React.ReactNode;
    description: string;
    side?: 'left' | 'right' | 'top' | 'bottom';
    sideOffset?: number;
};

const Hint = ({ children, description, side, sideOffset }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent
                    className="max-w-[220px] break-words text-xs"
                    side={side}
                    sideOffset={sideOffset}
                >
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

Hint.defaultProps = {
    side: 'bottom',
    sideOffset: 0,
};

export default Hint;
