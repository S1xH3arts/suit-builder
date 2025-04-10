
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SketchPicker } from "react-color";

export default function SuitBuilder() {
  const [name, setName] = useState("My Suit");
  const [entity, setEntity] = useState("armor_mysuit");
  const [desc, setDesc] = useState("");
  const [model, setModel] = useState("models/player/kleiner.mdl");
  const [health, setHealth] = useState(1000);
  const [armor, setArmor] = useState(500);
  const [speed, setSpeed] = useState(500);
  const [jump, setJump] = useState(300);
  const [lifestealPercent, setLifestealPercent] = useState(0.25);
  const [themeColor, setThemeColor] = useState("#ff0000");
  const [onGiveCustom, setOnGiveCustom] = useState("");
  const [onRemoveCustom, setOnRemoveCustom] = useState("");
  const [powers, setPowers] = useState({
    Godmode: false,
    Invisibility: false,
    Dash: false,
    Teleport: false,
    EMP: false,
    Rage: false,
    SuperPunch: false,
    FireTrail: false,
    CloakCrouch: false,
    Shrink: false,
    Lifesteal: false,
    Wallhack: false,
    Admin: false,
    DamageBuff: false
  });

  const togglePower = (key) => {
    setPowers({ ...powers, [key]: !powers[key] });
  };

  const generateCode = () => {
    const lines = [];
    lines.push("Armor:Add({");
    lines.push(`\tName = \"${name}\",`);
    lines.push(`\tLength = ( 99999 * 1 ),`);
    lines.push(`\tHealth = ${health},`);
    lines.push(`\tArmor = ${armor},`);
    lines.push(`\tDescription = \"${desc}\",`);
    lines.push(`\tModel = \"${model}\",`);
    lines.push(`\tEntitie = \"${entity}\",`);
    lines.push(`\tPrice = 250000000000,`);
    lines.push(`\tOnGive = function( ply )`);
    lines.push(`\t\tply:SetArmor(${armor})`);
    lines.push(`\t\tply:SetHealth(${health})`);
    lines.push(`\t\tply:SetJumpPower(${jump})`);
    lines.push(`\t\tply._oldRunSpeed = ply:GetRunSpeed()`);
    lines.push(`\t\tply:SetRunSpeed(${speed})`);
    lines.push(`\t\tply.ThemeColor = \"${themeColor}\"`);

    Object.keys(powers).forEach((p) => {
      if (powers[p]) {
        if (p === "Admin") lines.push("\t\tply.adminsuit = true");
        else if (p === "DamageBuff") lines.push("\t\tply.damage = true");
        else if (p === "Godmode") lines.push("\t\tply.IsAbleToGodmode = true");
        else if (p === "Invisibility") lines.push("\t\tply.Invisability = true");
        else if (p === "Dash") lines.push("\t\tply.CanDash = true");
        else if (p === "Teleport") lines.push("\t\tply.CanTeleport = true");
        else if (p === "EMP") lines.push("\t\tply.CanEMP = true");
        else if (p === "Rage") lines.push("\t\tply.CanRage = true");
        else if (p === "SuperPunch") lines.push("\t\tply.CanSuperPunch = true");
        else if (p === "FireTrail") lines.push("\t\tply.CanFireTrail = true");
        else if (p === "CloakCrouch") lines.push("\t\tply.CanCloakCrouch = true");
        else if (p === "Shrink") lines.push("\t\tply.CanShrink = true");
        else if (p === "Lifesteal") {
          lines.push("\t\tply.CanLifesteal = true");
          lines.push(`\t\tply.LifestealPercent = ${lifestealPercent}`);
        } else if (p === "Wallhack") lines.push("\t\tply.wallhackActive = true");
      }
    });

    if (onGiveCustom) lines.push("\t\t-- Custom OnGive\n\t\t" + onGiveCustom);
    lines.push("\tend,");
    lines.push("\tOnRemove = function( ply )");
    lines.push("\t\tply:SetArmor( 0 )");
    lines.push("\t\tply:SetHealth( 100 )");
    lines.push("\t\tply:SetJumpPower( 200 )");
    lines.push("\t\tif ply._oldRunSpeed then ply:SetRunSpeed(ply._oldRunSpeed) ply._oldRunSpeed = nil end");
    if (onRemoveCustom) lines.push("\t\t-- Custom OnRemove\n\t\t" + onRemoveCustom);
    lines.push("\tend,");
    lines.push("})");
    return lines.join("\n");
  };

  return <div>SuitBuilder Loaded</div>;
}
