import { EGameStatus } from "./game-status.model"
import { EGameStore } from "./game-store.model";

export interface IGame {
   id: number;
   title: string;
   sortName: string;
   isFullyOptimized: boolean;
   steamUrl: string;
   store: EGameStore;
   publisher: string;
   genres: string; // Maybe make this an enum eventually
   status: EGameStatus;
 }