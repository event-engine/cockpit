import MuiButton from './MuiButton';
import MuiIconButton from './MuiIconButton';
import MuiPaper from './MuiPaper';
import MuiTableCell from './MuiTableCell';
import MuiTableHead from './MuiTableHead';
import MuiTypography from './MuiTypography';
import MuiExpansionPanel from './MuiExpansionPanel';
import MuiExpansionPanelSummary from './MuiExpansionPanelSummary';
import MuiExpansionPanelDetails from './MuiExpansionPanelDetails';
import {darkPalette, lightPalette} from '../palette';
import MuiTableRow from './MuiTableRow';

export const lightOverrides = {
    MuiButton,
    MuiIconButton: MuiIconButton(lightPalette),
    MuiPaper,
    MuiTableCell: MuiTableCell(lightPalette),
    MuiTableHead,
    MuiTableRow: MuiTableRow(lightPalette),
    MuiTypography,
    MuiExpansionPanel,
    MuiExpansionPanelSummary,
    MuiExpansionPanelDetails,
};

export const darkOverrides = {
    MuiButton,
    MuiIconButton: MuiIconButton(darkPalette),
    MuiPaper,
    MuiTableCell: MuiTableCell(lightPalette),
    MuiTableHead,
    MuiTableRow: MuiTableRow(darkPalette),
    MuiTypography,
    MuiExpansionPanel,
    MuiExpansionPanelSummary,
    MuiExpansionPanelDetails,
};
