import { createRoutine } from "redux-saga-routines";
import { FETCH_BATTING_GRAPH_DATA } from "@ducks/battingGraph/battingGraphActions";

export const fetchBattingGraphData = createRoutine(FETCH_BATTING_GRAPH_DATA);
