import {
  Divider,
  List,
  ListItem,
  Stack,
  StackProps,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TypographyProps,
} from "@mui/material";
import { TRentalRequestShowResponse } from "../../../hooks/api/UseRentalRequestShow";
import { StyledTableCell } from "../../memberSize/styleTable/StyledTableCell";
import { StyledTableRow } from "../../memberSize/styleTable/StyledTableRow";

type TProps = {
  rentalRequestResponse: TRentalRequestShowResponse;
  coordinateChoiceId: number;
};

const EmphasizedText = (props: TypographyProps) => {
  return <Typography {...props} fontWeight={"bold"} variant="subtitle2" />;
};

const StackColumn = (props: StackProps) => {
  return <Stack {...props} direction={"row"} spacing={2} alignItems="center" />;
};

const StackRow = (props: StackProps) => {
  return <Stack {...props} direction={"row"} spacing={4} />;
};
export const RentalRequest = ({
  rentalRequestResponse,
  coordinateChoiceId,
}: TProps) => {
  const referenceSizes = [
    {
      part: "肩幅",
      size: rentalRequestResponse.referenceShoulderSize,
      option: rentalRequestResponse.shoulder,
    },
    {
      part: "バスト",
      size: rentalRequestResponse.referenceBustSize,
      option: rentalRequestResponse.bust,
    },
    {
      part: "着丈",
      size: rentalRequestResponse.referenceLengthBodySize,
    },
    {
      part: "腕の長さ",
      size: rentalRequestResponse.referenceLengthArm,
    },
    {
      part: "ウエスト",
      size: rentalRequestResponse.referenceWaistSize,
      option: `${rentalRequestResponse.waist ?? "なし"}`,
    },
    {
      part: "ヒップ",
      size: rentalRequestResponse.referenceHipSize,
      option: rentalRequestResponse.hip,
    },
    {
      part: "もも周り",
      size: rentalRequestResponse.referenceRoundLegSize,
    },
    {
      part: "股下",
      size: rentalRequestResponse.referenceLengthLegSize,
    },
    {
      part: "ふくらはぎ周り",
      size: rentalRequestResponse.referenceRoundCalfSize,
    },
  ];

  return (
    <div>
      <StackRow>
        <StackColumn>
          <EmphasizedText>BMI</EmphasizedText>
          <Typography>{rentalRequestResponse.bmi}</Typography>
        </StackColumn>
        <StackColumn>
          <EmphasizedText>身長</EmphasizedText>
          <Typography>{rentalRequestResponse.height}</Typography>
        </StackColumn>
        <StackColumn>
          <EmphasizedText>体重</EmphasizedText>
          <Typography>{rentalRequestResponse.weight}</Typography>
        </StackColumn>
      </StackRow>
      <Divider style={{ margin: "16px 0" }} />
      <Stack spacing={4}>
        <StackRow>
          <StackColumn>
            <EmphasizedText>トップス</EmphasizedText>
          </StackColumn>
          <StackColumn>
            <Typography>本人</Typography>
            <EmphasizedText>{rentalRequestResponse.topsSize}</EmphasizedText>
          </StackColumn>
        </StackRow>
      </Stack>
      <StackRow>
        <StackColumn>
          <EmphasizedText>ボトムス</EmphasizedText>
        </StackColumn>
        <StackColumn>
          <Stack>
            <StackColumn>
              <Typography>本人</Typography>
              <EmphasizedText>
                <EmphasizedText>
                  {rentalRequestResponse.bottomsSize}
                </EmphasizedText>
              </EmphasizedText>
            </StackColumn>
          </Stack>
        </StackColumn>
      </StackRow>
      <StackRow>
        <StackColumn>
          <EmphasizedText>ジャケット</EmphasizedText>
        </StackColumn>
        <StackColumn>
          <Stack>
            <StackRow>
              <StackColumn>
                <Typography>ドロップサイズ</Typography>
                <EmphasizedText>
                  {rentalRequestResponse.referenceJacketDropSize}
                </EmphasizedText>
              </StackColumn>
            </StackRow>
            <StackColumn>
              <Typography>参考サイズ</Typography>
              <EmphasizedText>
                <div
                  dangerouslySetInnerHTML={{
                    __html: rentalRequestResponse.referenceJacketSize,
                  }}
                ></div>
              </EmphasizedText>
            </StackColumn>
          </Stack>
        </StackColumn>
      </StackRow>
      <ListItem>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>部位</StyledTableCell>
                <StyledTableCell>参考サイズ</StyledTableCell>
                <StyledTableCell>入力</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referenceSizes.map((referenceSize, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <Typography fontWeight={"bold"} variant={"subtitle2"}>
                        {referenceSize.part}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>{referenceSize.size} cm</StyledTableCell>
                    <StyledTableCell>
                      {referenceSize.option ?? ""}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </ListItem>
      <ListItem>
        <Typography variant="h6">備考</Typography>
        <Typography>{rentalRequestResponse.freeText}</Typography>
      </ListItem>
      <Divider style={{ margin: "16px 0" }} />
      <ListItem>
        <List>
          {rentalRequestResponse.coordinateChoices
            .sort((a, b) => a.preferenceChoice - b.preferenceChoice)
            .map((coordinateChoice, index) => {
              return (
                <ListItem
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      marginRight: 16,
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight:
                          coordinateChoiceId === coordinateChoice.id
                            ? "bold"
                            : "normal",
                      }}
                    >{`第${index + 1}希望`}</Typography>
                    <Typography
                      style={{
                        fontWeight:
                          coordinateChoiceId === coordinateChoice.id
                            ? "bold"
                            : "normal",
                      }}
                    >
                      {coordinateChoice.name}
                    </Typography>
                  </div>
                  <img
                    src={`${process.env.REACT_APP_HOST_URL}${coordinateChoice.imageFilePath}`}
                    alt={coordinateChoice.name}
                    style={{ width: 100 }}
                  />
                </ListItem>
              );
            })}
        </List>
      </ListItem>
    </div>
  );
};
