export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          gold: number;
          created_at: string;
        };
        Insert: {
          id: string;
          gold?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          gold?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      monsters: {
        Row: {
          id: string;
          name: string;
          rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
          monster_type:
            | "aberration"
            | "beast"
            | "celestial"
            | "construct"
            | "dragon"
            | "elemental"
            | "fey"
            | "fiend"
            | "giant"
            | "humanoid"
            | "monstrosity"
            | "ooze"
            | "plant"
            | "undead";
          base_power: number;
          image_path: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
          monster_type:
            | "aberration"
            | "beast"
            | "celestial"
            | "construct"
            | "dragon"
            | "elemental"
            | "fey"
            | "fiend"
            | "giant"
            | "humanoid"
            | "monstrosity"
            | "ooze"
            | "plant"
            | "undead";
          base_power: number;
          image_path: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          rarity?: "common" | "rare" | "epic" | "legendary" | "mythic";
          monster_type?:
            | "aberration"
            | "beast"
            | "celestial"
            | "construct"
            | "dragon"
            | "elemental"
            | "fey"
            | "fiend"
            | "giant"
            | "humanoid"
            | "monstrosity"
            | "ooze"
            | "plant"
            | "undead";
          base_power?: number;
          image_path?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      pack_types: {
        Row: {
          id: string;
          code: string;
          name: string;
          price: number;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          price: number;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          price?: number;
        };
        Relationships: [];
      };
      packs: {
        Row: {
          id: string;
          user_id: string;
          pack_type_id: string;
          gold_spent: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          pack_type_id: string;
          gold_spent: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          pack_type_id?: string;
          gold_spent?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "packs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "packs_pack_type_id_fkey";
            columns: ["pack_type_id"];
            isOneToOne: false;
            referencedRelation: "pack_types";
            referencedColumns: ["id"];
          }
        ];
      };
      pack_monsters: {
        Row: {
          id: string;
          pack_id: string;
          monster_id: string;
        };
        Insert: {
          id?: string;
          pack_id: string;
          monster_id: string;
        };
        Update: {
          id?: string;
          pack_id?: string;
          monster_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pack_monsters_pack_id_fkey";
            columns: ["pack_id"];
            isOneToOne: false;
            referencedRelation: "packs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pack_monsters_monster_id_fkey";
            columns: ["monster_id"];
            isOneToOne: false;
            referencedRelation: "monsters";
            referencedColumns: ["id"];
          }
        ];
      };
      user_monsters: {
        Row: {
          id: string;
          user_id: string;
          monster_id: string;
          quantity: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          monster_id: string;
          quantity: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          monster_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "user_monsters_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_monsters_monster_id_fkey";
            columns: ["monster_id"];
            isOneToOne: false;
            referencedRelation: "monsters";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      open_pack: {
        Args: {
          pack_type_code: string;
        };
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type PackType = Database["public"]["Tables"]["pack_types"]["Row"];
export type Monster = Database["public"]["Tables"]["monsters"]["Row"];
export type UserMonster = Database["public"]["Tables"]["user_monsters"]["Row"];

export type OpenPackMonster = {
  id: string;
  name: string;
  rarity: Monster["rarity"];
  monster_type: Monster["monster_type"];
  base_power: number;
  image_path: string;
  quantity_before: number;
  quantity_after: number;
  level_after: number;
  is_duplicate: boolean;
  converted_to_gold: boolean;
  bonus_gold: number;
};

export type OpenPackResult = {
  pack_id: string;
  pack_type: {
    id: string;
    code: string;
    name: string;
    price: number;
  };
  gold_spent: number;
  gold_before: number;
  gold_after: number;
  bonus_gold: number;
  monsters: OpenPackMonster[];
};
