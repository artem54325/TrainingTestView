#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /app
EXPOSE 80 443 22 5000 5001

# FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
# WORKDIR /src
# COPY TrainingTests/TrainingTests.csproj TrainingTests/
# RUN dotnet restore "TrainingTests/TrainingTests.csproj"
COPY . .
# WORKDIR "/src/TrainingTests"
# RUN dotnet build "TrainingTests.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "TrainingTests.csproj" -c Release -o /app/publish

# apt-get
RUN apt-get update
RUN apt-get install -y mc
RUN apt-get install -y openssh-server
RUN apt-get install -y git
RUN apt-get install -y curl
RUN apt-get install -y supervisor

RUN mkdir /root/.ssh && \
    chmod 700 /root/.ssh && \
    ssh-keygen -A

RUN useradd -m -d /app -s /bin/bash -g sudo ubuntu
RUN echo 'ubuntu:qwe' | chpasswd
RUN echo 'root:root' | chpasswd

# ENTRYPOINT service ssh start # Все ломает
# CMD dotnet watch run --urls http://0.0.0.0:5000




# RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
# RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

# ENV NOTVISIBLE "in users profile"
# RUN echo "export VISIBLE=now" >> /etc/profile

# COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# CMD ["/usr/bin/supervisord"]


# RUN useradd -s /app -g sudo ubuntu
# RUN echo 'ubuntu:ubuntu' | chpasswd

# RUN service ssh start

# FROM base AS final
# WORKDIR /app/TrainingTests
# COPY --from=publish /app/publish .
# CMD dotnet watch run --urls http://0.0.0.0:5000

# ENTRYPOINT [ "dotnet", "watch", "run", "--no-restore", "--urls", "https://0.0.0.0:5001"]
# ENTRYPOINT "dotnet run ./"
# ["dotnet", "TrainingTests.dll"]
