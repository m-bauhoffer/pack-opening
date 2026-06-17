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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type PackType = Database["public"]["Tables"]["pack_types"]["Row"];
