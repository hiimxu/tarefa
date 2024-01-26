import { Board } from '@prisma/client';
import BoardTitleForm from './board-title-form';
import { BoardOptions } from './board-opntions';

type Props = {
    data: Board;
};

export const BoardNavbar = async ({ data }: Props) => {
    return (
        <div className="w-full h-14 z-40 bg-black/50 px-6 fixed top-14 flex items-center gap-x-4 text-white">
            <BoardTitleForm data={data} />
            <div className="ml-auto">
                <BoardOptions id={data.id} />
            </div>
        </div>
    );
};
