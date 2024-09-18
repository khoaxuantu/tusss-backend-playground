interface PowerSystemProps {
  STAGE_LIMIT: number;
  STAGE_PROPS: {
    NAME: string;
    LEVEL_LIMIT: number;
    EXP_LIMIT: number;
    EXP_LIMIT_GROWTH_STEP: number;
    GROWTH_RATIO: number;
    REWARD_EXP: {
      PK: number;
      CREEP: number;
      BOSS: number;
    };
  }[];
  RANK_UP_GROWTH_RATIO: number;
}

export enum POWER_RANK {
  PHAM_NHAN = "Phàm nhân",
  LUYEN_KHI = "Luyện Khí cảnh",
  TRUC_CO = "Trúc cơ cảnh",
  KIM_DAN = "Kim đan cảnh",
  // NGUYEN_ANH = "Nguyên Anh cảnh",
  // HOA_THAN = "Hóa Thần cảnh",
  // DUNG_HU = "Dung Hư cảnh",
  // HOP_THE = "Hợp Thể cảnh",
  // DO_KIEP = "Độ Kiếp cảnh",
  // DAI_THUA = "Đại Thừa cảnh",
  // TAN_TIEN = "Tán Tiên",
  // DIA_TIEN = "Địa Tiên",
  // THIEN_TIEN = "Thiên Tiên",
  // CHAN_TIEN = "Chân Tiên",
  // HUYEN_TIEN = "Huyền Tiên",
  // KIM_TIEN = "Kim Tiên",
  // TIEN_DE = "Tiên Đế",
  // THAN_NGUYEN = "Thần Nguyên",
  // DAI_LA_KIM_TIEN = "Đai La Kim Tiên",
  // CHUAN_THANH = "Chuẩn Thánh",
  // THANH_NHAN = "Thánh Nhân",
}

export const POWER_SYSTEM: Record<POWER_RANK, PowerSystemProps> = {
  [POWER_RANK.PHAM_NHAN]: {
    STAGE_LIMIT: 1,
    STAGE_PROPS: [{
      NAME: POWER_RANK.PHAM_NHAN,
      LEVEL_LIMIT: 10,
      EXP_LIMIT: 100,
      EXP_LIMIT_GROWTH_STEP: 10, // 100 -> 110 -> 120 -> 130 -> ...
      GROWTH_RATIO: 0.1,
      REWARD_EXP: {
        PK: 100,
        BOSS: 100,
        CREEP: 10,
      },
    }],
    RANK_UP_GROWTH_RATIO: 2,
  },
  [POWER_RANK.LUYEN_KHI]: {
    STAGE_LIMIT: 1,
    STAGE_PROPS: [{
      NAME: POWER_RANK.LUYEN_KHI,
      LEVEL_LIMIT: 9,
      EXP_LIMIT: 250,
      EXP_LIMIT_GROWTH_STEP: 50,
      GROWTH_RATIO: 0.1,
      REWARD_EXP: {
        PK: 150,
        BOSS: 250,
        CREEP: 12,
      },
    }],
    RANK_UP_GROWTH_RATIO: 2,
  },
  [POWER_RANK.TRUC_CO]: {
    STAGE_LIMIT: 1,
    STAGE_PROPS: [{
      NAME: POWER_RANK.TRUC_CO,
      LEVEL_LIMIT: 9,
      EXP_LIMIT: 1000,
      EXP_LIMIT_GROWTH_STEP: 100,
      GROWTH_RATIO: 0.2,
      REWARD_EXP: {
        PK: 350,
        BOSS: 1200,
        CREEP: 20,
      },
    }],
    RANK_UP_GROWTH_RATIO: 5,
  },
  [POWER_RANK.KIM_DAN]: {
    STAGE_LIMIT: 3,
    STAGE_PROPS: [
      {
        NAME: "Kim Đan sơ giai",
        LEVEL_LIMIT: 9,
        EXP_LIMIT: 2500,
        EXP_LIMIT_GROWTH_STEP: 500,
        GROWTH_RATIO: 0.5,
        REWARD_EXP: {
          PK: 1500,
          BOSS: 2000,
          CREEP: 25,
        },
      },
      {
        NAME: "Kim Đan địa giai",
        LEVEL_LIMIT: 9,
        EXP_LIMIT: 7500,
        EXP_LIMIT_GROWTH_STEP: 600,
        GROWTH_RATIO: 0.6,
        REWARD_EXP: {
          PK: 2500,
          BOSS: 4000,
          CREEP: 30,
        }
      },
      {
        NAME: "Kim đan thiên giai",
        LEVEL_LIMIT: 9,
        EXP_LIMIT: 15000,
        EXP_LIMIT_GROWTH_STEP: 700,
        GROWTH_RATIO: 0.75,
        REWARD_EXP: {
          PK: 7500,
          BOSS: 10000,
          CREEP: 50,
        }
      },
    ],
    RANK_UP_GROWTH_RATIO: 10,
  }
};
