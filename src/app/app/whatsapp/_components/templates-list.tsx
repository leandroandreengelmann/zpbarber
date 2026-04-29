"use client";

import { useState } from "react";
import { ChatTeardropTextIcon, PencilSimpleIcon, PlusIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  WHATSAPP_TRIGGER_LABEL,
  type WhatsappTrigger,
} from "@/lib/zod/whatsapp";
import { TemplateForm } from "./template-form";

type Tpl = {
  id: string;
  slug: string;
  trigger: WhatsappTrigger;
  name: string;
  body: string;
  is_active: boolean;
};

export function TemplatesList({ templates }: { templates: Tpl[] }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Templates ({templates.length})
        </h2>
        {!creating && (
          <Button size="sm" onClick={() => setCreating(true)}>
            <PlusIcon size={16} weight="bold" /> Novo template
          </Button>
        )}
      </div>

      {creating && (
        <Card>
          <CardContent className="p-5">
            <h3 className="mb-3 text-text-sm font-semibold text-[var(--color-text-primary)]">
              Novo template
            </h3>
            <TemplateForm
              template={{
                slug: "",
                trigger: "manual",
                name: "",
                body: "",
                is_active: true,
              }}
              onCancel={() => setCreating(false)}
              onSaved={() => setCreating(false)}
            />
          </CardContent>
        </Card>
      )}

      {templates.length === 0 && !creating ? (
        <Card>
          <CardContent className="grid place-items-center gap-2 px-5 py-12 text-center">
            <ChatTeardropTextIcon
              size={28}
              weight="duotone"
              className="text-[var(--color-fg-quaternary)]"
            />
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Nenhum template ainda.
            </p>
          </CardContent>
        </Card>
      ) : (
        templates.map((t) =>
          editing === t.id ? (
            <Card key={t.id}>
              <CardContent className="p-5">
                <TemplateForm
                  template={t}
                  onCancel={() => setEditing(null)}
                  onSaved={() => setEditing(null)}
                />
              </CardContent>
            </Card>
          ) : (
            <Card key={t.id}>
              <CardContent className="grid gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
                        {t.name}
                      </span>
                      <Badge variant="secondary" className="text-text-xs">
                        {WHATSAPP_TRIGGER_LABEL[t.trigger]}
                      </Badge>
                      {!t.is_active && (
                        <Badge className="border bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] text-text-xs">
                          Inativo
                        </Badge>
                      )}
                    </div>
                    <code className="text-text-xs text-[var(--color-text-tertiary)]">
                      {t.slug}
                    </code>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditing(t.id)}
                  >
                    <PencilSimpleIcon size={16} weight="duotone" /> Editar
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3 font-sans text-text-sm text-[var(--color-text-secondary)]">
                  {t.body}
                </pre>
              </CardContent>
            </Card>
          )
        )
      )}
    </div>
  );
}
