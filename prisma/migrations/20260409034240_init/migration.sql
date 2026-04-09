-- CreateTable
CREATE TABLE "tercos_oferecidos" (
    "id" TEXT NOT NULL,
    "nomeDevoto" TEXT,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "intencao" TEXT,
    "rezadoPeloCasal" BOOLEAN NOT NULL DEFAULT false,
    "dataOferta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tercos_oferecidos_pkey" PRIMARY KEY ("id")
);
